import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { Stock } from './entities/stock.entity';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AddStockDTO, MedicineQuantityDTO } from './dto/add-stock.dto';
import { Medicine_quantity } from 'src/common/types/type';
import { Medicine } from 'src/medicine/entities/medicine.entity';

@Injectable()
export class StockService extends BaseService<Stock> {
  constructor(
    @InjectModel(Stock.name)
    private readonly stockModel: Model<Stock>,
  ) {
    super(stockModel, AddStockDTO);
  }

  async getStockByDistributor(client_id: string): Promise<Stock> {
    try {
      const stock = (
        await this.stockModel.findOne({ distributor: client_id })
      ).populate(['medicine_quantity.medicine']);
      return stock;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async addMedicineToStock(
    newMedicine: MedicineQuantityDTO,
    distributorId: string,
  ) {
    try {
      const stock = await this.stockModel.findOne({
        distributor: distributorId,
      });
      if (stock) {
        const medicineId = newMedicine.medicine;
        const quantity = newMedicine.quantity;
        const stockMedicines = stock.medicine_quantity;
        let modified = false;
        for (let i = 0; i < stockMedicines.length; i++) {
          if (stockMedicines[i].medicine === medicineId) {
            (stockMedicines[i].quantity as number) += quantity;
            modified = true;
            break;
          }
        }
        if (!modified) {
          const update = await this.stockModel.findByIdAndUpdate(
            stock.id,
            { $push: { medicine_quantity: newMedicine } },
            { new: true, useFindAndModify: false },
          );
          return update;
        } else {
          return await stock.save();
        }
      } else {
        throw new HttpException(
          'you need to create a stock for the distibutor first',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
