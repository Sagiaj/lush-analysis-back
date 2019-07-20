import firebase, { firestore } from 'firebase';
import 'firebase/firestore';
import firebaseConfig from '../config/firebase';

type FB_COLLECTIONS = "daily_traffic_analysis" | "referer_analysis";

enum FirebaseCollectionSchema {
    DAILY_TRAFFIC_ANALYSIS = "daily_traffic_analysis",
    REFERER_ANALYSIS = "referer_analysis"
};

firebase.initializeApp(firebaseConfig);

export class FirebaseService {
    static db: firestore.Firestore = firebase.firestore(firebase.app());
    static increment: firestore.FieldValue = firebase.firestore.FieldValue.increment(1);

    static async getDB(col: FB_COLLECTIONS): Promise<firestore.CollectionReference> {
        try {
            if (Object.values(FirebaseCollectionSchema).indexOf(col) === -1) {
                return Promise.reject(`Collection "${col}" was not found.`);
            }
            return await FirebaseService.db.collection(col);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    static async incrementDocumentField(document: firestore.DocumentReference, field: string) {
        try {
            const batch = FirebaseService.db.batch();
            batch.set(document, { [field]: FirebaseService.increment }, { merge: true });
            batch.commit();
            return Promise.resolve(true);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    static async getOrSetFBDoc(documentRef: firestore.DocumentReference, defaultObject: object = {}): Promise<firestore.DocumentReference> {
        try {
            if ( !(await documentRef.get()).exists ) {
                await documentRef.set(defaultObject);
            }
            return documentRef;
        } catch (err) {
            return Promise.reject(err);
        }
    }

    static async getOrSetFBCol(collectionRef: firestore.CollectionReference, defaultObject: object = {}): Promise<firestore.CollectionReference> {
        try {
            if ( (await collectionRef.get()).empty ) {
                await collectionRef.add(defaultObject);
            }
            return collectionRef;
        } catch (err) {
            return Promise.reject(err);
        }
    }

    static async incrementRefererByDate(referer: string) {
        try {
            console.log('referring!', referer)
            let date: string = new Date().toLocaleDateString().replace(/\//g, '-'); // m-d-Y
            let analysisCol = await FirebaseService.getDB(FirebaseCollectionSchema.REFERER_ANALYSIS);
            let domainDoc = await FirebaseService.getOrSetFBDoc(analysisCol.doc(referer));
            let datesCol = await FirebaseService.getOrSetFBCol(domainDoc.collection("dates"));
            let curDateDoc = await FirebaseService.getOrSetFBDoc(datesCol.doc(date), { dateTime: new Date() });
            FirebaseService.incrementDocumentField(curDateDoc, "visits");
            FirebaseService.incrementDocumentField(domainDoc, "totalVisits");
        } catch (err) {
            return Promise.resolve(err);
        }
    }

    static async getDataByDateRange(start: string, end: string) {
        try {
            let analysisCol = await FirebaseService.getDB(FirebaseCollectionSchema.REFERER_ANALYSIS);
            let results = (await analysisCol.get()).docs.map(a => ({ ref: a.ref, id: a.id}));
            let datesDocs = results.map(async ({id, ref}) => 
                ({
                    site: id,
                    visits: await (await ref.collection('dates')
                                .where('dateTime', '>=', new Date(start))
                                .where('dateTime', '<', new Date(new Date(end).getTime() + 84600000))
                                .get()
                            ).docs.map(doc => ({ date: doc.id, visits: doc.data().visits }))
                })
            );
            let resolvedDateDocs = await Promise.all(datesDocs.map(async a => await a));
            return await resolvedDateDocs.map(doc => ({site: doc.site, visits: doc.visits})).filter(obj => !!obj.visits.length);
        } catch (err) {
            return Promise.reject(err);
        }
    }
}
