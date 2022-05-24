import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
const prisma = new PrismaClient()

// POST /api/user
// Required fields in body: name, email
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  const products = await prisma.equipment.findMany({
    where: {
      OR: [
        {
          brand: {
            contains: req?.query?.slug.toString(),
            mode: 'insensitive',
          }
        },
        {
          model: {
            contains: req?.query?.slug.toString(),
            mode: 'insensitive',
          }
        }
      ]
    },
    include: {
      photos: true,
      user: {
        select: {
          state: true,
          city: true
        }
      }
    }
  })

  if (products.length) {
    res.status(200).json(products)
  } else {
    res.status(400).json('Not Found')
  }
}
