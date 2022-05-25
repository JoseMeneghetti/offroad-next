import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function getBikeIds() {
  const products = await prisma.bike.findMany({
    select: {
      brand: false,
      createdAt: false,
      describe: false,
      id: true,
      km: false,
      model: false,
      photos: false,
      price: false,
      user: false,
      userId: false,
      yearF: false,
      yearM: false
    }
  })

  const justIds = products.flat().map(ele => {
    return `${ele.id}`
  })
  return justIds
}

export async function getEquipmentIds() {
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
  return justIds
}

export async function getBikeProducts(query: number) {
  const product = await prisma.bike.findUnique({
    where: {
      id: query
    },
    select: {
      brand: true,
      describe: true,
      id: true,
      createdAt: false,
      km: true,
      hours: true,
      model: true,
      price: true,
      userId: true,
      yearF: true,
      yearM: true,
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
  return product
}

export async function getEquipmentProducts(query: number) {
  const product = await prisma.equipment.findUnique({
    where: {
      id: query
    },
    select: {
      brand: true,
      describe: true,
      id: true,
      createdAt: false,
      type: true,
      model: true,
      price: true,
      userId: true,
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
  return product
}

export async function getAllBikesHome() {
  const products = await prisma.bike.findMany({
    select: {
      brand: true,
      describe: true,
      id: true,
      createdAt: false,
      km: true,
      hours: true,
      model: true,
      price: true,
      userId: true,
      yearF: true,
      yearM: true,
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
  return products
}
