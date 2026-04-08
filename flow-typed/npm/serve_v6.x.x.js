// flow-typed signature: 5c4b059122c68a5b2cb034aa2e981643
// flow-typed version: c6154227d1/serve_v6.x.x/flow_>=v0.54.x <=v0.103.x

declare module "serve" {
  declare type Options = {|
    auth?: boolean,
    cache?: number,
    clipless?: boolean,
    cors?: boolean,
    help?: boolean,
    ignore?: Array<string>,
    open?: boolean,
    port?: number,
    silent?: boolean,
    single?: boolean,
    ssl?: boolean,
    treeless?: boolean,
    unzipped?: boolean,
    version?: boolean
  |};

  declare type Result = {
    stop: () => void
  };

  declare export default function serve(
    directory: string,
    options: Options
  ): Result;
}
