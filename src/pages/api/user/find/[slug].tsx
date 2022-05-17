import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
const prisma = new PrismaClient()

// POST /api/user
// Required fields in body: name, email
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await prisma.user.findMany({
    where: {
      email: {
        equals: req?.query?.slug.toString()
      }
    }
  })
  if (result.length) {
    res.status(200).json(`We found ${result[0].email} in your dataBase`)
  } else {
    res.status(400).json('Not Found')
  }
}
