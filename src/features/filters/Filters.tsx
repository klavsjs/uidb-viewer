import { DialogTrigger } from "react-aria-components"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { Popover } from "../../components/ui/Popover"
import { Button } from "../../components/ui/Button"
import { Dialog } from "../../components/ui/Dialog"
import { Checkbox } from "../../components/ui/Checkbox"
import { type Filter, filtersSlice } from "./filtersSlice"
import { ToggleButton } from "../../components/ui/ToggleButton"
import { useState } from "react"

export const Filters = () => {
  const [isOpen, setIsOpen] = useState(false)
  const filtersOptions = useAppSelector(
    filtersSlice.selectors.selectFilterOptions,
  )
  const filterValues = useAppSelector(filtersSlice.selectors.selectFilters)
  const filtersCount = Object.values(filterValues).filter(Boolean).length
  const dispatch = useAppDispatch()

  const handleFilterChange = (filter: Filter) => {
    dispatch(filtersSlice.actions.toggleFilter(filter))
  }

  return (
    <DialogTrigger onOpenChange={setIsOpen}>
      <ToggleButton isSelected={isOpen} aria-label="Filters">
        Filter{filtersCount > 0 && ` (${filtersCount})`}
      </ToggleButton>
      <Popover className="max-w-[250px]" placement="bottom left">
        <Dialog>
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold">Product Line</p>
            <div className="flex flex-col gap-2">
              {filtersOptions.map(filter => (
                <Checkbox
                  key={filter}
                  isSelected={filterValues[filter]}
                  onChange={() => handleFilterChange(filter)}
                >
                  {filter}
                </Checkbox>
              ))}
            </div>
            <div>
              <Button
                variant="destructive"
                onPress={() => dispatch(filtersSlice.actions.clearFilters())}
                isDisabled={filtersCount === 0}
              >
                Reset
              </Button>
            </div>
          </div>
        </Dialog>
      </Popover>
    </DialogTrigger>
  )
}
