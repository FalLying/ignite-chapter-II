import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async create({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      expected_return_date,
      user_id,
      start_date: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }

  async findOpenRentalByUserId(userId: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.user_id === userId && !rental.end_date
    );
  }

  async findOpenRentalByCarId(carId: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.car_id === carId && !rental.end_date
    );
  }
}

export { RentalsRepositoryInMemory };
