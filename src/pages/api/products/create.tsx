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

  try {
    const updateUser = await prisma.user.update({
      where: {
        id: body.bike.userId
      },
      data: {
        name: body.bike.name,
        phone: body.bike.phone,
        cep: body.bike.cep,
        city: body.bike.city,
        state: body.bike.state
      }
    })

    const productResult = await prisma.product.create({
      data: {
        brand: body.bike.brand,
        model: body.bike.model,
        yearF: body.bike.yearF,
        yearM: body.bike.yearM,
        km: body.bike.km,
        price: body.bike.price,
        describe: body.bike.describe,
        userId: body.bike.userId
      }
    })

    body.photos.forEach(async ele => {
      const resultPhotos = await prisma.photos.create({
        data: {
          photo: ele,
          productId: productResult.id
        }
      })
    })

    res.status(200).json('Sucesso!')
  } catch (error) {
    res.status(500).json('House um problema com o banco de dados')
  }
}
