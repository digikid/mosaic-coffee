require('dotenv').config({ path: '.env.local' })

const fs = require('fs')
const ftp = require('basic-ftp')

const { FTP_HOST, FTP_USER, FTP_PASSWORD, FTP_TARGET_PATH, FTP_OUTPUT_PATH } =
  process.env

const config = require('./vue.config')

const { publicPath: PATH } = config

const FTP_PATH = `${FTP_TARGET_PATH}${PATH}`.replace('//', '')

;(async () => {
  if (
    !FTP_HOST ||
    !FTP_USER ||
    !FTP_PASSWORD ||
    !FTP_TARGET_PATH ||
    !FTP_OUTPUT_PATH ||
    !fs.existsSync(`./${FTP_OUTPUT_PATH}`)
  ) {
    process.exit()
  }

  const client = new ftp.Client()

  client.ftp.verbose = true

  try {
    await client.access({
      host: FTP_HOST,
      user: FTP_USER,
      password: FTP_PASSWORD
    })

    await client.ensureDir(FTP_PATH)
    await client.clearWorkingDir()
    await client.uploadFromDir(`./${FTP_OUTPUT_PATH}`)

    console.info('Deploy success.')
  } catch (err) {
    console.error(err)
  }

  client.close()

  process.exit()
})()
