import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
const prisma = new PrismaClient()

// POST /api/user
// Required fields in body: name, email
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const query = parseInt(req?.query?.slug.toString())

  const product = await prisma.bike.findUnique({
    where: {
      id: query
    },
    include: {
      photos: true,
      user: {
        select: {
          state: true,
          city: true,
          phone: true,
          name: true
        }
      }
    }
  })

  if (product.id) {
    res.status(200).json(product)
  } else {
    res.status(400).json('Not Found')
  }
}
