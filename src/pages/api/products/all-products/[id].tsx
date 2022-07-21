import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
const prisma = new PrismaClient()

// POST /api/user
// Required fields in body: name, email
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const bikeProducts = await prisma.equipment.findMany({
      where: {
        id: parseInt(req?.query?.id.toString())
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
    const equipmentProducts = await prisma.equipment.findMany({
      where: {
        id: parseInt(req?.query?.id.toString())
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
    if (bikeProducts.length || equipmentProducts.length) {
      res.status(200).json([bikeProducts, equipmentProducts])
    } else {
      res.status(400).json('Not Found')
    }
  } catch (error) {
    res.status(400).json(error)
  }
}
