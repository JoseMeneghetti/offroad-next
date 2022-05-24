import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
const prisma = new PrismaClient()

// POST /api/user
// Required fields in body: name, email
export default async function handle(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const products = await prisma.equipment.findMany({
    select: {
      brand: false,
      createdAt: false,
      describe: false,
      id: true,
      type: false,
      model: false,
      photos: false,
      price: false,
      user: false,
      userId: false
    }
  })

  const justIds = products.flat().map(ele => {
    return `${ele.id}`
  })

  if (justIds.length) {
    res.status(200).json(JSON.stringify(justIds))
  } else {
    res.status(400).json('Not Found')
  }
}
