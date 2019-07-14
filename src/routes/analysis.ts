import { Router } from 'express';
import { FirebaseService } from '../services/firebase-service';
const router = Router();

router.get('/incomingClient/:referer', async (req: any, res: any) => {
    try {
        let { referer } = req.params;
        if (referer === undefined) {
            return res.status(500).send( {error: "Referer was undefined" });
        }
        let domainMatches = referer.match(/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g);
        console.log('check referer:', referer)
        if (referer === "" || referer === null || referer === "null") {
            domainMatches = ["Independent entry"];
        }
        if (domainMatches) {
            FirebaseService.incrementRefererByDate(domainMatches[0]);
            return res.send(domainMatches[0]);
        }
        // perform firestore increment
        // update/insert date increment to doc
        return res.status(404).send({ error: "could not match domain name" });
    } catch (err) {
        console.log('there was an error!', err);
        return res.status(500).send({ error: err });
    }
});

router.post('/getDataByDateRange', async (req: any, res: any) => {
    try {
        let { startDate, endDate } = req.body;
        let results = await FirebaseService.getDataByDateRange(startDate, endDate);
        res.send(results);
    } catch (err) {
        console.log('there was an error!', err);
        return res.status(500).send({ error: err });
    }
});

export const analysisRoutes  = router;
