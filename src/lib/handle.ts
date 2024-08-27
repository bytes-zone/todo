import { init } from "./use-automerge"
import * as ops from "./ops"
import type { AppV1 } from "./types"
import type { DocHandle } from "@automerge/automerge-repo/slim"

export const handle: DocHandle<AppV1> = await init(ops.init())
