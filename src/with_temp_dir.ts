import { Path } from "jsr:@david/path@0.2";

/**
 * Creates a temporary directory, changes the cwd to this directory,
 * then cleans up and restores the cwd when complete.
 */
export async function withTempDir(action: (path: Path) => Promise<void> | void) {
  await using dirPath = usingTempDir();
  await action(new Path(dirPath).resolve());
}

export function usingTempDir(): Path & AsyncDisposable {
  const originalDirPath = Deno.cwd();
  const dirPath = Deno.makeTempDirSync();
  Deno.chdir(dirPath);
  const pathRef = new Path(dirPath).resolve();
  (pathRef as any)[Symbol.asyncDispose] = async () => {
    try {
      await Deno.remove(dirPath, { recursive: true });
    } catch {
      // ignore
    }
    Deno.chdir(originalDirPath);
  };
  return pathRef as Path & AsyncDisposable;
}
