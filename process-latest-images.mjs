import fs from "fs"
import path from "path"
import { execSync } from "child_process"

const sourceDir = "/Users/kousikdutta/.copilot/workspaces/58cd97df-0c5f-4e55-aab2-c4e229f04862/attachments/"
const destDir = "/Users/kousikdutta/Projects/UI/app/public/assets/images/about"

// Get files and sort by modified time (newest first)
const files = fs.readdirSync(sourceDir)
  .filter(f => f.endsWith(".png") || f.endsWith(".jpg"))
  .map(name => ({
    name,
    time: fs.statSync(path.join(sourceDir, name)).mtime.getTime()
  }))
  .sort((a, b) => b.time - a.time)
  .slice(0, 21) // Take only the 21 newest ones
  .reverse() // Put them in chronological order

// Clean the dest dir first
fs.rmSync(destDir, { recursive: true, force: true })
fs.mkdirSync(destDir, { recursive: true })

const imagesData = []

files.forEach((fileObj, index) => {
  const file = fileObj.name
  const sourcePath = path.join(sourceDir, file)
  const ext = path.extname(file)
  const newName = `about-${index + 1}${ext}`
  const destPath = path.join(destDir, newName)
  
  // Copy file
  fs.copyFileSync(sourcePath, destPath)
  
  // Get dimensions using sips
  try {
    const widthStr = execSync(`sips -g pixelWidth "${destPath}" | grep -o '[0-9]*$'`).toString().trim()
    const heightStr = execSync(`sips -g pixelHeight "${destPath}" | grep -o '[0-9]*$'`).toString().trim()
    
    const width = parseInt(widthStr, 10)
    const height = parseInt(heightStr, 10)
    
    let aspectRatio = "square"
    if (width > height * 1.1) aspectRatio = "wide"
    else if (height > width * 1.1) aspectRatio = "tall"
    
    // Add graduation caption to the last one (the one with '62954bb5' in the name)
    let alt = `Gallery image ${index + 1}`
    if (file.includes("62954bb5-d9dd-482b-8cc2-f6521f57eadd") || index === 20) {
      alt = "Graduation 2023 - Receiving University Gold Medal with Parents"
    } else if (aspectRatio === "wide") {
      alt = "Design event and community gathering"
    } else {
      alt = "Design workshop and presentation"
    }

    imagesData.push({
      id: `img-${index + 1}`,
      src: `assets/images/about/${newName}`,
      alt: alt,
      aspectRatio: aspectRatio
    })
  } catch(e) {
    console.error("Error processing", file, e.message)
  }
})

console.log(JSON.stringify(imagesData, null, 2))
