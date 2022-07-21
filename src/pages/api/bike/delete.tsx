import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
const prisma = new PrismaClient()

// POST /api/user
// Required fields in body: name, email
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = { ...req.body }
    console.log(body)
  try {
    const products = await prisma.bike.findUnique({
      where: {
        id: body.idProduct
      },
      select: {
        id: true,
        photos: {
          select: {
            id: true
          }
        }
      }
    })

    products.photos.map(
      async ele =>
        await prisma.bikePhotos.delete({
          where: {
            id: ele.id
          }
        })
    )

    const deleteBike = await prisma.bike.delete({
      where: {
        id: body.idProduct
      }
    })

    res.status(200).json(`Sucesso \n ${deleteBike}`)
  } catch (error) {
    res.status(500).json(`${error} - House um problema com o banco de dados`)
  }
}
