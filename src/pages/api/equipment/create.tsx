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
    await prisma.user.update({
      where: {
        id: body.equipment.userId
      },
      data: {
        name: body.equipment.name,
        phone: body.equipment.phone,
        cep: body.equipment.cep,
        city: body.equipment.city,
        state: body.equipment.state
      }
    })

    const productResult = await prisma.equipment.create({
      data: {
        brand: body.equipment.brand,
        model: body.equipment.model,
        type: body.equipment.type,
        price: body.equipment.price,
        describe: body.equipment.describe,
        userId: body.equipment.userId
      }
    })

    const photos = body.photos.reduce((acumulator, element: string) => {
      return [...acumulator, { photo: element[0], path: element[1], equipmentId: productResult.id }]
    }, [])

    await prisma.equipmentPhotos.createMany({
      data: photos
    })

    res.status(200).json('Sucesso!')
  } catch (error) {
    res.status(500).json(`${error} - House um problema com o banco de dados`)
  }
}
