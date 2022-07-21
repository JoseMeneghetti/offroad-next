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
    await prisma.user.update({
      where: {
        id: body.profile.id
      },
      data: {
        name: body.profile.name,
        phone: body.profile.phone,
        cep: body.profile.cep,
        city: body.profile.city,
        state: body.profile.state
      }
    })

    res.status(200).json('Sucesso!')
  } catch (error) {
    res.status(400).json('Problema com o cadastro!')
  }
}
