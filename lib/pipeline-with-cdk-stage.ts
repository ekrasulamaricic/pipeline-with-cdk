import { CfnOutput, Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {PipelineWithCdkStack} from "./pipeline-with-cdk-stack";

/**
 * Deployable unit of web service app
 */
export class PipelineWithCdkStage extends Stage {
    public readonly urlOutput: CfnOutput;

    constructor(scope: Construct, id: string, props?: StageProps) {
        super(scope, id, props);

        const service = new PipelineWithCdkStack(this, 'WebService');

        // Expose PipelineWithCdkStage's output one level higher
        this.urlOutput = service.urlOutput;
    }
}
