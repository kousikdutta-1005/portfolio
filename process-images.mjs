import fs from "fs"
import path from "path"
import { execSync } from "child_process"

const sourceDir = "/Users/kousikdutta/.copilot/workspaces/58cd97df-0c5f-4e55-aab2-c4e229f04862/attachments/"
const destDir = "/Users/kousikdutta/Projects/UI/app/public/assets/images/about"

const files = fs.readdirSync(sourceDir).filter(f => f.endsWith(".png") || f.endsWith(".jpg"))

const imagesData = []

files.forEach((file, index) => {
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
    if (file.includes("62954bb5-d9dd-482b-8cc2-f6521f57eadd")) {
      alt = "Graduation 2023 - Receiving Awards with Parents"
    }

    imagesData.push({
      id: `img-${index + 1}`,
      src: `assets/images/about/${newName}`,
      alt: alt,
      aspectRatio: aspectRatio,
      originalName: file
    })
  } catch(e) {
    console.error("Error processing", file, e.message)
  }
})

console.log(JSON.stringify(imagesData, null, 2))
