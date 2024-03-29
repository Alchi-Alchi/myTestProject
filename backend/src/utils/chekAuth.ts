import jwt, { JwtPayload, Secret } from "jsonwebtoken";
interface CustomJwtPayload extends JwtPayload {
    _id: string;
}
export default (req: any, res: any, next: any) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if (token) {
        try {
            const decoded = jwt.verify(token, 'riddle') as CustomJwtPayload;
            req.userID = decoded._id;
            next();
        } catch (error) {
            return res.status(403).json({message: 'Failed'});
        }
    } else {
        return res.status(400).json({message: 'Failed'});
    }
}