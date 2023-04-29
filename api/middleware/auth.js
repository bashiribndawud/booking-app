import jwt from 'jsonwebtoken'
import User from "../models/userModel"



export const isAuthenticated = async (req, res, next){
    try {
        
    } catch (error) {
        res.status(500).send(err);
    }

}