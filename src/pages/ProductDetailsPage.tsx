import { useNavigate, useParams } from "react-router-dom"
import { useAppSelector } from "../app/hooks"
import { productsSlice } from "../features/products/productsSlice"
import { Button } from "../components/ui/Button"
import { ChevronLeftIcon } from "lucide-react"
import { getImgUrl } from "../utils/getImgUrl"
import { DialogTrigger } from "react-aria-components"
import { Modal } from "../components/ui/Modal"
import { Dialog } from "../components/ui/Dialog"

const ProductDetailsPage = () => {
  const { id } = useParams()
  const products = useAppSelector(productsSlice.selectors.selectProducts)
  let currentIndex = 0
  const item = products.find((item, index) => {
    currentIndex = index
    return item.id === id
  })
  const navigate = useNavigate()

  if (!item) {
    return <div>Product not found</div>
  }

  const prevProductId = products[currentIndex - 1]?.id
  const nextProductId = products[currentIndex + 1]?.id

  const imgUrl = getImgUrl(item.id, item.images.default, "lg")

  return (
    <>
      <aside className="flex justify-between px-8 py-5">
        <Button onPress={() => navigate("/")}>
          <ChevronLeftIcon
            size={20}
            className="text-black/45"
            strokeWidth={1}
          />
          Back
        </Button>
        <div className="flex gap-1">
          <Button
            aria-label="Previous product"
            onPress={() => navigate(`/${prevProductId}`)}
            isDisabled={prevProductId === undefined}
          >
            <ChevronLeftIcon
              size={20}
              className="text-black/45"
              strokeWidth={1}
            />
          </Button>
          <Button
            aria-label="Next product"
            onPress={() => navigate(`/${nextProductId}`)}
            isDisabled={nextProductId === undefined}
          >
            <ChevronLeftIcon
              size={20}
              className="rotate-180 text-black/45"
              strokeWidth={1}
            />
          </Button>
        </div>
      </aside>
      <div className="mx-auto mt-4 grid grid-cols-[1fr_1.25fr] justify-center gap-8 px-8">
        <div className="aspect-square max-h-[292px] rounded-lg bg-gray-100 p-4">
          <img src={imgUrl} alt={item.product.name} className="h-full" />
        </div>
        <div className="flex flex-col">
          <h1 className="pb-1 text-xl font-semibold text-black/85">
            {item.product.name}
          </h1>
          <h2 className="text-sm text-black/45">{item.line.name}</h2>
          <div className="flex flex-col gap-3 py-5">
            <div className="flex justify-between gap-2">
              <p className="text-sm text-black/85">Product Line</p>
              <p className="text-end text-sm text-black/45">{item.line.name}</p>
            </div>
            <div className="flex justify-between gap-2">
              <p className="text-sm text-black/85">ID</p>
              <p className="text-end text-sm text-black/45">{item.line.id}</p>
            </div>
            <div className="flex justify-between gap-2">
              <p className="text-sm text-black/85">Name</p>
              <p className="text-end text-sm text-black/45">
                {item.product.name}
              </p>
            </div>
            <div className="flex justify-between gap-2">
              <p className="text-sm text-black/85">Short Name</p>
              <p className="text-end text-sm text-black/45">
                {item.product.abbrev}
              </p>
            </div>
            {item?.unifi?.network?.ethernetMaxSpeedMegabitsPerSecond && (
              <div className="flex justify-between gap-2">
                <p className="text-sm text-black/85">Speed</p>
                <p className="text-end text-sm text-black/45">
                  {item.unifi.network.ethernetMaxSpeedMegabitsPerSecond} Mbps
                </p>
              </div>
            )}
            {item?.unifi?.network?.numberOfPorts && (
              <div className="flex justify-between gap-2">
                <p className="text-sm text-black/85">Number of Ports</p>
                <p className="text-end text-sm text-black/45">
                  {item.unifi.network.numberOfPorts}
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col justify-end">
            <DialogTrigger>
              <Button variant="link">See All Details as JSON</Button>
              <Modal isDismissable>
                <Dialog>
                  {({ close }) => (
                    <>
                      <div className="max-h-[80vh] overflow-auto px-6">
                        <pre className="text-xs">
                          {JSON.stringify(item, null, 2)}
                        </pre>
                      </div>
                      <Button
                        variant="destructive"
                        className="absolute right-4 top-2"
                        onPress={close}
                      >
                        Close
                      </Button>
                    </>
                  )}
                </Dialog>
              </Modal>
            </DialogTrigger>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetailsPage
