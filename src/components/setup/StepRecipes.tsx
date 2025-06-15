
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function defaultMenuItem() {
  return {
    name: "",
    ingredients: [
      { name: "", qty: "", unit: "" },
    ],
  };
}

const units = ["kg", "g", "L", "pcs"];

export default function StepRecipes({
  value,
  onNext,
  onPrev,
}: {
  value?: any[];
  onNext: (data: any[]) => void;
  onPrev: () => void;
}) {
  const [menu, setMenu] = useState(value?.length ? value : [defaultMenuItem()]);

  function handleAddMenu() {
    setMenu(m => [...m, defaultMenuItem()]);
  }
  function handleMenuName(i: number, v: string) {
    setMenu(m =>
      m.map((item, j) => (i === j ? { ...item, name: v } : item))
    );
  }
  function handleAddIngredient(i: number) {
    setMenu(m =>
      m.map((item, j) =>
        i !== j
          ? item
          : { ...item, ingredients: [...item.ingredients, { name: "", qty: "", unit: "" }] }
      )
    );
  }
  function handleIngredientChange(
    menuIdx: number,
    ingIdx: number,
    field: string,
    value: string
  ) {
    setMenu(menu =>
      menu.map((item, i) =>
        i === menuIdx
          ? {
              ...item,
              ingredients: item.ingredients.map((ing, j) =>
                j === ingIdx ? { ...ing, [field]: value } : ing
              ),
            }
          : item
      )
    );
  }

  function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    onNext(menu);
  }

  return (
    <form onSubmit={handleContinue} className="flex flex-col gap-8">
      <div>
        <label className="font-bold text-white mb-3 block">
          Map your recipes to ingredients
        </label>
        <div className="flex flex-col gap-6">
          {menu.map((item, idx) => (
            <div key={idx} className="bg-white/10 p-4 rounded-xl shadow-lg flex flex-col gap-2">
              <Input
                className="bg-white border-[#3CE8B3] focus:border-[#3CE8B3] text-base mb-2"
                placeholder="Menu Item Name"
                value={item.name}
                onChange={e => handleMenuName(idx, e.target.value)}
                required
              />
              <div className="ml-1 text-teal-200 font-semibold mb-1">Ingredients</div>
              {item.ingredients.map((ing, ingIdx) => (
                <div key={ingIdx} className="flex flex-col md:flex-row gap-3">
                  <Input
                    className="bg-white border-[#3CE8B3] focus:border-[#3CE8B3] text-base"
                    placeholder="Ingredient"
                    value={ing.name}
                    onChange={e =>
                      handleIngredientChange(idx, ingIdx, "name", e.target.value)
                    }
                    required
                  />
                  <Input
                    type="number"
                    min={0}
                    className="bg-white border-[#3CE8B3] focus:border-[#3CE8B3] text-base"
                    placeholder="Quantity"
                    value={ing.qty}
                    onChange={e =>
                      handleIngredientChange(idx, ingIdx, "qty", e.target.value)
                    }
                    required
                  />
                  <select
                    className="rounded-md px-2 py-2 border border-[#3CE8B3] bg-white text-gray-700 text-base"
                    value={ing.unit}
                    onChange={e =>
                      handleIngredientChange(idx, ingIdx, "unit", e.target.value)
                    }
                    required
                  >
                    <option value="" disabled>
                      Unit
                    </option>
                    {units.map(u => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
              <Button
                type="button"
                className="mt-2 bg-[#3CE8B3] hover:bg-[#37d9a6] text-white font-semibold px-3 py-1 rounded"
                onClick={() => handleAddIngredient(idx)}
              >
                + Add Ingredient
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={handleAddMenu}
            className="bg-white/20 text-teal-200 border border-[#3CE8B3] hover:bg-[#3CE8B3] hover:text-white font-bold py-2 rounded transition mt-3"
          >
            + New Menu Item
          </Button>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onPrev}
          className="font-bold text-white border-white hover:bg-white/10"
        >
          Back
        </Button>
        <Button
          type="submit"
          className="bg-[#3CE8B3] hover:bg-[#37d9a6] text-white font-bold px-8 py-2 rounded-lg"
        >
          Continue
        </Button>
      </div>
    </form>
  );
}
