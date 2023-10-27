import jwt from 'jsonwebtoken'

class JwtService {
  static verify (token, secret = process.env.JWT_SECRET_KEY) {
    return jwt.verify(token, secret)
  }
}

export default JwtService
