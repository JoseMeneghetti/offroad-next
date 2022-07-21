import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
const prisma = new PrismaClient()

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = { ...req.body }
  console.log(body)
  try {
    const user = await prisma.user.findMany({
      where: {
        email: {
          equals: req?.query?.slug?.toString()
        }
      },
      select: {
        id: true
      }
    })

    const bikes = await prisma.bike.findMany({
      where: { userId: user[0].id },
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

    const equipments = await prisma.equipment.findMany({
      where: { userId: user[0].id },
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

    const result = { bikes, equipments }

    res.status(200).json(result)
  } catch (error) {
    res.status(400).json('Problema com o cadastro!')
  }
}
