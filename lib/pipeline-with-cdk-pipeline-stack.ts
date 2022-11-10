import { Construct } from 'constructs';
import { Stack, StackProps} from "aws-cdk-lib";
import {CodePipeline, ShellStep, CodePipelineSource} from "aws-cdk-lib/pipelines";
import {PipelineWithCdkStage} from "./pipeline-with-cdk-stage";

export class PipelineWithCdkPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);


    const pipeline = new CodePipeline(this, 'Pipeline', {
      // The pipeline name
      pipelineName: 'OurServicePipeline',

      // How it will be built and synthesized
      synth: new ShellStep('Synth', {
        // Where the source can be found
        input: CodePipelineSource.gitHub('ekrasulamaricic/pipeline-with-cdk', 'main'),

        // Install dependencies, build and run cdk synth
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth'
        ],
      }),
    });

    // This is where we add the application stages
    pipeline.addStage(new PipelineWithCdkStage(this, 'PreProd', {
      env: { account: '824731037889', region: 'eu-central-1' }
    }));
  }
}
