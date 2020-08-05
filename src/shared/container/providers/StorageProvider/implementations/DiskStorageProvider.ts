import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';

import IStorageProvider from '../models/IStorageProvider';

export default class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    // Moving the file from tmp/ to tmp/uploads
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpfolder, file),
      path.resolve(uploadConfig.uploadsFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    // Check if file exists
    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
