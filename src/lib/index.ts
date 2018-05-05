import {config} from './config';
import {createBigQuery, getDataset, getTable} from './common/bigQuery';

const schema = {
    "incident_uuid": "string",
    "user_id": "string",
    "timestamp": "integer",
    "type": "string",
    "latitude": "float",
    "longitude": "float",
    "nature": "string",
    "happened_before": "boolean",
};

export const setup = async (req, res) => {

    const dataset = getDataset();
    try {
        const results = await dataset.createTable(config.bigQuery.tableId, {
            timePartitioning: {type: "DAY"},
            schema: Object
                .keys(schema)
                .reduce(
                    (agg, key) => [
                        ...agg,
                        key + ":" + schema[key],
                    ],
                    [],
                ).join(", "),
        });
        res.send({
            result: `Table ${results[0].id} created.`,
        });
    } catch (error) {
        res.send({
            error: 'ERROR: ' + error.message,
        });
    }
};

export const write = async (req, res) => {

    if (req.method !== "POST") {
        res.status(400).send({
            error: "Method must be POST",
        });
    }

    try {
        await getTable().insert(req.body);
        res.send({status: "success"});
    } catch (error) {
        res.status(500).send({error: error.message});

    }

};
