import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp()

const createImageMeta = (name: string, fileMeta: object) => {
    return admin.firestore().collection('files')
        .doc(name)
        .set(fileMeta)
        .then();
}

const updateDefaultUser = (name: string) => {
    return admin.firestore().collection('users')
        .doc('1ffKvrnr7lj4Gu0TzpBE') //DefaultUser ID, temporary
        .update(
            {
                profilePicId: name
            }
        )
        .then();
}

const deleteFileMeta = (id: string) => {
    return admin.firestore().collection('files')
        .doc(id)
        .delete()
        .then();
}

exports.uploadImage = functions.storage.object().onFinalize((object) => {
    return new Promise(async (resolve, reject) => {
        if (object && object.name && object.metadata) {
            const fileMeta = {
                lastModified: object.updated,
                name: object.metadata.originalName,
                type: object.contentType,
                size: object.size
            };
            const nameForDoc = object.name.split('/')[1]; //forumpost-pictures/xyz --> xyz
            await createImageMeta(nameForDoc, fileMeta);
            console.log('Image metadata has been created! ID: ' + nameForDoc)

            let storageResult;
            if (object.name && object.name.split('/')[0] === 'profile-pictures') {
                storageResult = await updateDefaultUser(nameForDoc);
                console.log('DefaultUser has been updated!')
            }
            resolve(storageResult);
        } else {
            reject('Error! Not enough metadata or file data');
        }
    });
});

exports.deletePost = functions.firestore.document('forumposts/{ID}').onDelete((snap) => {
    return new Promise(async (resolve, reject) => {
        const deletedPost = snap.data();
        if (deletedPost) {
            await deleteFileMeta(deletedPost.pictureID)
                .catch(error => {
                    reject('File metadata could not be deleted: ' + error);
                });
            console.log('File metadata has been deleted! ID: ' + deletedPost.pictureID);

            try {
                const restultFromStorage = await admin.storage()
                    .bucket().file('forumpost-pictures/' + deletedPost.pictureID)
                    .delete()
                    .then();

                resolve(restultFromStorage);
                console.log('Post picture has been deleted! ID: ' + deletedPost.pictureID);
            } catch (error) {
                reject(error);
            }
        } else {
            reject('Post could not be deleted');
        }
    });
});

exports.deleteOldProfilePicture = functions.firestore.document('users/{userID}').onUpdate((change, context) => {
    return new Promise(async (resolve, reject) => {
        if (change.before && change.before.data()) {
            const beforeData = change.before.data();
            try {
                if (beforeData) {
                    const deletePicID = beforeData.profilePicId;

                    await deleteFileMeta(deletePicID)
                        .catch(error => {
                            reject('File metadata could not be deleted: ' + error);
                        });
                    console.log('File metadata has been deleted! ID: ' + deletePicID);

                    const deleteResult = await admin.storage().bucket()
                        .file('profile-pictures/' + deletePicID)
                        .delete()
                        .then();
                    resolve(deleteResult);
                    console.log('Old profile picture has been deleted! ID: ' + deletePicID);
                }
            } catch (error) {
                reject('UserID: ' + context.params.userID + '; ' + error);
            }
        } else {
            reject('Old profile picture could not be deleted! UID: ' + context.params.userID);
        }
    });
});