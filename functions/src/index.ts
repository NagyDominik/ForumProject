import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

admin.initializeApp()

exports.uploadNewPostImage = functions.storage.object().onFinalize((object) => {
    if (object.name && object.name.split('/')[0] === 'forumpost-pictures') {
        return new Promise((resolve, reject) => {
            if (object && object.name && object.metadata) {
                const fileMeta = {
                    lastModified: object.updated,
                    name: object.metadata.originalName,
                    type: object.contentType,
                    size: object.size
                };
                const nameForDoc = object.name.split('/')[1]; // forumpost-pictures/xyz
                admin.firestore().collection('files')
                    .doc(nameForDoc)
                    .set(fileMeta)
                    .then(result => resolve(result))
                    .catch(err => reject(err))
            } else {
                reject('Error! Not enough metadata or file data');
            }
        });
    } else {
        return undefined;
    }
});

exports.uploadNewProfileImage = functions.storage.object().onFinalize((object) => {
    if (object.name && object.name.split('/')[0] === 'profile-pictures') {
        return new Promise((resolve, reject) => {
            if (object && object.name && object.metadata) {
                const fileMeta = {
                    lastModified: object.updated,
                    name: object.metadata.originalName,
                    type: object.contentType,
                    size: object.size
                };
                const nameForDoc = object.name.split('/')[1]; // profile-pictures/xyz
                admin.firestore().collection('files')
                    .doc(nameForDoc)
                    .set(fileMeta)
                    .then(() => {
                        admin.firestore().collection('users')
                            .doc('defaultUser')
                            .update(
                                {
                                    profileImage: nameForDoc
                                }
                            )
                            .then(result => resolve(result))
                            .catch(err => reject(err))
                    })
                    .catch(err => reject(err))
            } else {
                reject('Error! Not enough metadata or file data');
            }
        });
    } else {
        return undefined;
    }
});
