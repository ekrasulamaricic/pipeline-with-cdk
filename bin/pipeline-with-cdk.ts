#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {PipelineWithCdkPipelineStack} from "../lib/pipeline-with-cdk-pipeline-stack";

const app = new cdk.App();
new PipelineWithCdkPipelineStack(app, 'PipelineWithCdkPipelineStack', {
    env: {
        account: '824731037889',
        region: 'eu-central-1',
    }
});

app.synth();
