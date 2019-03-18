import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

admin.initializeApp()

const createImageMeta = (name: string, fileMeta: object) => {
    return admin.firestore().collection('files')
        .doc(name)
        .set(fileMeta)
        .then();
}

const updateDefaultUser = (name: string) => {
    return admin.firestore().collection('users')
        .doc('1ffKvrnr7lj4Gu0TzpBE') //DefaultUser ID, temporary stuff
        .update(
            {
                profilePicId: name
            }
        )
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
            const nameForDoc = object.name.split('/')[1]; // forumpost-pictures/xyz
            await createImageMeta(nameForDoc, fileMeta);
            console.log('Image Meta has been created!')

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