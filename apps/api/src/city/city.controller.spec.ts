import { City, PrismaPromise } from '.prisma/client'
import { Test, TestingModule } from '@nestjs/testing'

import { PrismaService } from '../prisma/prisma.service'
import { CityController } from './city.controller'
import { CityService } from './city.service'

import 'jest-extended';

describe('CityController', () => {
  let controller: CityController
  let prismaService: PrismaService

  beforeEach(() => {
    prismaService = new PrismaService()
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CityController],
      providers: [CityService, PrismaService],
    }).compile()

    controller = module.get<CityController>(CityController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('getData', () => {
    it('should list all cities in db', async () => {
      const expectedCities: City[] = [
        {
          countryId: expect.any(String),
          id: expect.any(String),
          name: 'Sofia',
          postalCode: 1000,
        },
        {
          countryId: expect.any(String),
          id: expect.any(String),
          name: 'Plovdiv',
          postalCode: 4000,
        },
        {
          countryId: expect.any(String),
          id: expect.any(String),
          name: 'Varna',
          postalCode: 9000,
        },
      ]

      const mockCityList = jest.fn<PrismaPromise<City[]>, []>().mockResolvedValue(expectedCities)

      jest.spyOn(prismaService.city, 'findMany').mockImplementation(mockCityList)

      expect(await controller.getData()).toIncludeSameMembers(expectedCities)
    })
  })
})
