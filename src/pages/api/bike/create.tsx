import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { GooglePhotosLogo } from 'phosphor-react'
const prisma = new PrismaClient()

// POST /api/user
// Required fields in body: name, email
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = { ...req.body }
  try {
    await prisma.user.update({
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

    const productResult = await prisma.bike.create({
      data: {
        brand: body.bike.brand,
        model: body.bike.model,
        yearF: body.bike.yearF,
        yearM: body.bike.yearM,
        km: body.bike.km,
        hours: body.bike.hours,
        price: body.bike.price,
        describe: body.bike.describe,
        userId: body.bike.userId
      }
    })

    const photos = body.photos.reduce((acumulator, element: string) => {
      return [...acumulator, { photo: element, bikeId: productResult.id }]
    }, [])

    await prisma.bikePhotos.createMany({
      data: photos
    })

    res.status(200).json('Sucesso!')
  } catch (error) {
    res.status(500).json(`${error} - House um problema com o banco de dados`)
  }
}
