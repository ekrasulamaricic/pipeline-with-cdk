import { Construct } from 'constructs';
import { Stack, StackProps} from "aws-cdk-lib";
import {CodePipeline, ShellStep, CodePipelineSource} from "aws-cdk-lib/pipelines";

export class PipelineWithCdkPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);


    const pipeline = new CodePipeline(this, 'Pipeline', {
      // The pipeline name
      pipelineName: 'MyServicePipeline',

      // How it will be built and synthesized
      synth: new ShellStep('Synth', {
        // Where the source can be found
        input: CodePipelineSource.gitHub('ekrasulamaricic/ci-cd-aws-pipeline', 'main'),

        // Install dependencies, build and run cdk synth
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth'
        ],
      }),
    });
  }
}
