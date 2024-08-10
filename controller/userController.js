import { User } from '../models/userModel.js'
import path from 'path'
import { fileURLToPath } from 'url'
import { sendMail } from '../middlewares/sendMail.js'

export const brochureDownload = async (req, res) => {
    try {
        const files = [
            'The Crown.pdf', 'The Emperor.pdf', 'LIC.pdf'
        ]

        const { name, email, mob, val } = req.body
        
        if(!name || !email || !mob) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        
        let user = await User.findOne({ email })

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const fName = files[val];
        const filePath = path.join(__dirname, '../uploads', fName);

        if(!user) {
            user = await User.create({
                name,
                email,
                mob,
            })
        }

        user.brochures.push(fName)
        await user.save();

        res.removeHeader('Content-Disposition');
        res.removeHeader('Content-Type');

        res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; font-src 'self'; object-src 'none'; frame-src 'none'; media-src 'self'");

        const message = `Hey, I am ${name}. My email is ${email}. I am interested in ${files[val]}.`;

        await sendMail({
            email: process.env.SALE_MAIL,
            subject: 'Brochure Download',
            message
        })

        res.download(filePath, fName, (err) => {
            if (err) {
                console.error('Error downloading the file:', err);
                if (!res.headersSent) {
                    res.status(500).send('Error downloading the file');
                }
            } else {
                console.log("File downloaded successfully");
                if (!res.headersSent) {
                    res.status(200).send('File downloaded successfully');
                }
            }
        });
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const contactUs = async (req, res) => {
    try {
        const {fName, email, msg} = req.body;

        if(!fName || !email || !msg) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const message = `Hey, I am ${fName}. My email is ${email}. And my full message is ${msg}.`;

        await sendMail({
            email: process.env.SALE_MAIL,
            subject: 'Contact Us',
            message
        })

        return res.status(200).json({
            success: true,
            message: "Message sent successfully"
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}