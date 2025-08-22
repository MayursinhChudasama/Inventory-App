import { cStockChallans, singleChallanEntry } from "@/models/challans";
import { inwardEntry } from "@/models/models";

export default function getCurrentStock(ALL_CHALLANS: inwardEntry[]) {
  const inwardChallans = ALL_CHALLANS?.filter(
    (challan) => challan.type === "inward"
  );
  const outwardChallans = ALL_CHALLANS?.filter(
    (challan) => challan.type === "outward"
  );
  // console.log("ALL_CHALLANS", ALL_CHALLANS);

  const inwardChallansFlatArr = inwardChallans
    ?.map((challan) => {
      return challan.products.map((product) => {
        return {
          category: challan.category,
          brand: product.brand,
          model: product.model,
          qty: product.qty,
          createdAt: challan.createdAt,
        };
      });
    })
    .flat();
  // console.log("inwardChallansFlatArr", inwardChallansFlatArr);
  const outwardChallansFlatArr = outwardChallans
    ?.map((challan) => {
      return challan.products.map((product) => {
        return {
          category: challan.category,
          brand: product.brand,
          model: product.model,
          qty: product.qty,
          createdAt: challan.createdAt,
        };
      });
    })
    .flat();
  // console.log("outwardChallansFlatArr", outwardChallansFlatArr);
  const InwarduniqueModelsArrayName: string[] = [];
  const OutwarduniqueModelsArrayName: string[] = [];
  const final_inward_challans_array: singleChallanEntry[] = [];
  // final_inward_challans_array
  const array = inwardChallansFlatArr?.map((product) => {
    const finalResultArray2 = [];
    if (!InwarduniqueModelsArrayName.includes(product.model)) {
      InwarduniqueModelsArrayName.push(product.model);
      final_inward_challans_array.push({
        category: product.category,
        brand: product.brand,
        model: product.model,
        qty: product.qty,
        createdAt: product.createdAt,
      });
      finalResultArray2.push({
        category: product.category,
        brand: product.brand,
        model: product.model,
        qty: product.qty,
        createdAt: product.createdAt,
      });
    } else {
      const index = final_inward_challans_array.findIndex(
        (item) => item.model === product.model
      );
      final_inward_challans_array[index].qty += product.qty;
    }

    return finalResultArray2;
  });

  const final_outward_challans_array: singleChallanEntry[] = [];
  const array2 = outwardChallansFlatArr?.map((product) => {
    const finalResultArray2 = [];
    if (!OutwarduniqueModelsArrayName.includes(product.model)) {
      OutwarduniqueModelsArrayName.push(product.model);
      final_outward_challans_array.push({
        category: product.category,
        brand: product.brand,
        model: product.model,
        qty: product.qty,
        createdAt: product.createdAt,
      });
      finalResultArray2.push({
        category: product.category,
        brand: product.brand,
        model: product.model,
        qty: product.qty,
        createdAt: product.createdAt,
      });
    } else {
      const index = final_outward_challans_array.findIndex(
        (item) => item.model === product.model
      );
      final_outward_challans_array[index].qty += product.qty;
    }

    return finalResultArray2;
  });

  const CURRENT_STOCK_CHALLANS = final_inward_challans_array.map((challan) => {
    const index = final_outward_challans_array.findIndex(
      (item) => item.model === challan.model
    );
    if (index !== -1) {
      return {
        ...challan,
        qty: challan.qty - final_outward_challans_array[index].qty,
      };
    }
    return challan;
  });

  return {
    inwardChallansFlatArr,
    outwardChallansFlatArr,
    CURRENT_STOCK_CHALLANS,
  };
}
