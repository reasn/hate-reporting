import * as BigQuery from '@google-cloud/bigquery';
import {config} from '../config';
import {getRoot} from './getRoot';
import {join} from "path";

export const createBigQuery = () => new BigQuery({
    projectId: config.bigQuery.projectId,
    keyFilename: join(getRoot(), config.bigQuery.keyFilename),
});

export const getDataset = () => createBigQuery().dataset(config.bigQuery.datasetName);

export const getTable = () => getDataset().table(config.bigQuery.tableId);