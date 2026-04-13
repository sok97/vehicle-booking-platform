// ଏହି ଫାଇଲ୍ (global.d.ts) ଆମେ ପ୍ରୋଜେକ୍ଟରେ ସାଧାରଣ ଟାଇପ୍ ଡିଫିନିସନ୍ ଓ ଗ୍ଲୋବାଲ୍ ଟାଇପ୍ ଡିକ୍ଲେରେସନ୍ ରଖିବା ପାଇଁ ବ୍ୟବହାର କରୁଛୁ ।
// ଏହା ଦ୍ୱାରା ସମସ୍ତ ଫାଇଲ୍ ରେ ଏହି ଟାଇପ୍ ଏବଂ ଇଣ୍ଟରଫେସ୍ ଉପଲବ୍ଧ ହୁଏ ।

import { Connection } from "mongoose";

declare global {
    var mongooseConn: {
        conn: Connection | null;
        promise: Promise<Connection> | null;
    } | undefined;
}
export {}