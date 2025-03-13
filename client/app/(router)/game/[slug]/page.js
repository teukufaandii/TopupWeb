"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGameContext } from "@/app/(store)/useGameContext";
import Image from "next/image";
import {
  DollarSign,
  Flag,
  Minus,
  PhoneCall,
  Plus,
  Shield,
  ThumbsUp,
} from "lucide-react";
import { useTransactionContext } from "@/app/(store)/useTransactionContext";
import toast from "react-hot-toast";
import { useUserContext } from "@/app/(store)/useUserContext";

const FEATURES = [
  { icon: <ThumbsUp size={16} />, text: "Terpercaya" },
  { icon: <Shield size={16} />, text: "Aman" },
  { icon: <DollarSign size={16} />, text: "Murah" },
];

const GameHeader = ({ game }) => (
  <>
    <div className="relative w-full h-[200px] md:h-[300px] overflow-hidden">
      {game?.image && (
        <Image
          src={game.image}
          alt={`${game.name} Banner`}
          width={1920}
          height={400}
          className="shadow-lg"
          priority
        />
      )}
    </div>
    <div className="flex min-h-32 w-full items-center border-b bg-gradient-to-br from-green-600 to-green-800 lg:min-h-[160px]">
      <div className="container flex items-center gap-6 mx-auto px-2 h-[160px]">
        <div>
          <div className="flex items-start gap-4">
            <div className="relative -top-28">
              {game?.image && (
                <Image
                  src={game.image}
                  height={300}
                  width={300}
                  alt={`${game.name} Icon`}
                  sizes="(max-width: 768px) 128px, 240px"
                  className="z-20 -mb-14 aspect-square w-32 h-32 rounded-2xl object-cover shadow-2xl md:-mb-20 md:w-60"
                />
              )}
            </div>
          </div>
        </div>
        <div className="py-4 sm:py-0">
          <h1 className="text-xs font-bold text-gray-300 uppercase leading-7 tracking-wider sm:text-lg">
            {game.name}
          </h1>
          <p className="text-xs text-gray-300 font-medium sm:text-base/6">
            {game.description}
          </p>
          <div className="mt-4 flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:gap-8 sm:text-sm/6">
            {FEATURES.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                {item.icon}
                <span className="text-sm/7 font-medium text-gray-300">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
);

const FormSection = ({ title, number, children }) => (
  <section className="relative scroll-mt-20 rounded-xl bg-card/50 shadow-2xl md:scroll-mt-[7.5rem]">
    <div className="flex items-center overflow-hidden rounded-t-xl bg-card">
      <div className="flex h-10 w-10 items-center justify-center bg-primary font-semibold text-primary-foreground">
        {number}
      </div>
      <h2 className="px-4 py-2 text-sm/6 font-semibold text-card-foreground">
        {title}
      </h2>
    </div>
    <div className="overflow-hidden p-4">{children}</div>
  </section>
);

const GameItem = ({
  item,
  selectedItem,
  onSelect,
  formatPrice,
  calculateDiscountedPrice,
  imagePlaceholder,
}) => (
  <div
    onClick={() => onSelect(item)}
    role="radio"
    aria-checked={selectedItem?._id === item._id}
    className={`relative flex min-h-[85px] cursor-pointer rounded-xl border p-2.5 text-muted-foreground shadow-sm outline-none md:p-4 bg-order-variant-background text-order-variant-foreground transition-all ${
      selectedItem?._id === item._id
        ? "border-primary border-2"
        : "border-transparent hover:border-primary/50"
    }`}
  >
    <span className="flex flex-1">
      <span className="flex flex-col justify-start">
        <span className="block text-xs font-semibold">{item.name}</span>
        <div className="flex flex-col">
          {item.isDiscount && (
            <span className="mt-1 flex items-center text-[11px] font-semibold line-through text-muted-foreground/60">
              {formatPrice(item.price)}
            </span>
          )}
          <span
            className={`flex items-center text-[11px] font-semibold ${
              item.isDiscount ? "text-red-500" : "text-muted-foreground/60"
            }`}
          >
            {formatPrice(calculateDiscountedPrice(item))}
          </span>
        </div>
      </span>
    </span>
    {item.isDiscount && (
      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full px-2 py-1 font-bold">
        {item.discountValue}% OFF
      </div>
    )}
    <div className="flex aspect-square w-8 items-center">
      <Image
        src={item.image || imagePlaceholder}
        alt={item.name}
        width={32}
        height={32}
        className="h-8 w-8 rounded-md object-cover"
      />
    </div>
  </div>
);

const LoadingSkeleton = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="animate-pulse">
      <div className="h-64 bg-gray-700 rounded-lg mb-4"></div>
      <div className="h-8 bg-gray-700 rounded w-1/2 mb-4"></div>
      <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
    </div>
  </div>
);

// Utility functions
const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const calculateDiscountedPrice = (item) => {
  if (!item?.isDiscount) return item?.price || 0;

  if (item.discount === "percentage") {
    return item.price - item.price * (item.discountValue / 100);
  } else if (item.discount === "fixed") {
    return item.price - item.discountValue;
  }

  return item.price;
};

const GameDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { game, loading, getGameBySlug } = useGameContext();
  const { user } = useUserContext();
  const {
    createTransaction,
    transactionDetails,
    success,
    error,
    transactionLoading,
  } = useTransactionContext();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const ref = useRef(false);

  // State
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [phone, setPhone] = useState(user?.phoneNumber || "+62");
  const [gameUid, setGameUid] = useState("");
  const [server, setServer] = useState("");

  // Image placeholder
  const imagePlaceholder =
    "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";

  useEffect(() => {
    if (params.slug) {
      getGameBySlug(params.slug);
      ref.current = true;
    }
  }, [params.slug]);

  useEffect(() => {
    if (success === true) {
      router.push(`/transaction/${transactionDetails.transaction.invoiceId}`);
    } else if (success === false && error) {
      toast.error(error);
    }
  }, [success, error, router, transactionDetails]);

  const handleQuantityChange = (value) => {
    const newQuantity = Number(value);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedItem || !gameUid || !phone) {
      toast.error("Silakan lengkapi semua data");
      return;
    }
    setIsConfirmationModalOpen(true);
  };

  const handleConfirm = () => {
    createTransaction({
      itemId: selectedItem._id,
      gameUid,
      server,
      phoneNumber: phone,
      quantity,
    });
    setIsConfirmationModalOpen(false);
  };

  const ConfirmationModal = ({ isOpen, onClose, data }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Konfirmasi Pesanan</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Item:
              </label>
              <p className="mt-1 text-sm text-gray-900">
                {data.selectedItem?.name}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Harga:
              </label>
              <p className="mt-1 text-sm text-gray-900">
                {formatPrice(calculateDiscountedPrice(data.selectedItem))}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Jumlah:
              </label>
              <p className="mt-1 text-sm text-gray-900">{data.quantity}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Total:
              </label>
              <p className="mt-1 text-sm text-gray-900">
                {formatPrice(
                  calculateDiscountedPrice(data.selectedItem) * data.quantity
                )}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                No. WhatsApp:
              </label>
              <p className="mt-1 text-sm text-gray-900">{data.phone}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ID Game:
              </label>
              <p className="mt-1 text-sm text-gray-900">{data.gameUid}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Server:
              </label>
              <p className="mt-1 text-sm text-gray-900">{data.server}</p>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={() => {
                handleConfirm();
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90"
            >
              Konfirmasi
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (transactionLoading) {
    return <LoadingSkeleton />;
  }

  if (!game) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-300">Game tidak ditemukan</div>
      </div>
    );
  }

  return (
    <>
      <GameHeader game={game} />
      <div className="container mx-auto px-4">
        <div className="mt-4 lg:mt-8">
          <div className="container flex w-full flex-col gap-4">
            <div className="h-10 items-center justify-center rounded-xl bg-muted p-1 text-muted-foreground flex w-full">
              <div className="inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full">
                Transaksi
              </div>
            </div>
          </div>
          <div className="mt-0 lg:block">
            <form
              onSubmit={handleSubmit}
              className="container relative mt-4 grid grid-cols-2 gap-4 md:gap-8 lg:mt-8"
            >
              <div className="col-span-3 col-start-1 flex flex-col gap-4 lg:col-span-2 lg:gap-8 mb-6">
                <FormSection title="Masukkan Data Akun" number={1}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="id"
                          className="block text-xs font-medium text-foreground pb-2"
                        >
                          ID
                        </label>
                        <input
                          placeholder="Ketikkan ID"
                          name="id"
                          value={gameUid}
                          onChange={(e) => setGameUid(e.target.value)}
                          id="id"
                          min="0"
                          type="number"
                          className="relative block w-full appearance-none rounded-lg border border-border bg-input px-3 py-2 text-xs text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-75"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="server"
                          className="block text-xs font-medium text-foreground pb-2"
                        >
                          Server
                        </label>
                        <input
                          placeholder="Ketikkan Server"
                          name="server"
                          value={server}
                          onChange={(e) => setServer(e.target.value)}
                          type="text"
                          className="relative block w-full appearance-none rounded-lg border border-border bg-input px-3 py-2 text-xs text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-75"
                        />
                      </div>
                    </div>
                  </div>
                </FormSection>

                <FormSection title="Pilih Item" number={2}>
                  <div className="flex flex-col space-y-4">
                    <section className="pb-4 text-sm/6 font-semibold text-card-foreground">
                      Topup {game.name}
                    </section>
                  </div>
                  <div>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
                      {game.items &&
                        game.items.map((item) => (
                          <GameItem
                            key={item._id}
                            item={item}
                            selectedItem={selectedItem}
                            onSelect={setSelectedItem}
                            formatPrice={formatPrice}
                            calculateDiscountedPrice={calculateDiscountedPrice}
                            imagePlaceholder={imagePlaceholder}
                          />
                        ))}
                    </div>
                  </div>
                </FormSection>

                <FormSection title="Masukkan Jumlah Pembelian" number={3}>
                  <div className="flex items-center gap-x-4">
                    <div className="flex-1">
                      <div className="flex flex-col items-start">
                        <input
                          className="relative block w-full appearance-none rounded-lg border border-border bg-input px-3 py-2 text-xs text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-75"
                          type="number"
                          name="quantity"
                          placeholder="Ketikkan Jumlah"
                          value={quantity}
                          onChange={(e) => handleQuantityChange(e.target.value)}
                          min="1"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={incrementQuantity}
                        className="inline-flex items-center justify-center whitespace-nowrap transition-all rounded-lg shadow-sm text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 w-9"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={decrementQuantity}
                        className="inline-flex items-center justify-center whitespace-nowrap transition-all rounded-lg shadow-sm text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 w-9"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </FormSection>

                <FormSection title="Detail Kontak" number={4}>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                      <label className="block text-xs font-medium text-foreground">
                        No. WhatsApp
                      </label>
                      <div className="flex">
                        <button
                          type="button"
                          className="inline-flex items-center justify-center whitespace-nowrap transition-all rounded-lg shadow-sm text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border/50 bg-transparent hover:bg-accent/75 hover:text-accent-foreground h-9 px-4 py-2 flex gap-1 rounded-e-none rounded-s-lg border-r-0 px-3 focus:z-10"
                        >
                          <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20 [&_svg]:size-full">
                            <PhoneCall className="h-5 w-5" />
                          </span>
                        </button>
                        <input
                          type="tel"
                          value={phone}
                          placeholder="628XXXXXXXXXX"
                          onChange={(e) => setPhone(e.target.value)}
                          className="flex h-9 w-full rounded-md border border-input bg-input px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm rounded-e-lg rounded-s-none PhoneInputInput"
                          required
                        />
                      </div>
                      <span className="text-xxs italic text-card-foreground">
                        **Nomor ini akan dihubungi jika terjadi masalah
                      </span>
                    </div>
                  </div>
                </FormSection>
              </div>

              <div className="fixed inset-x-0 bottom-0 z-40 block w-full space-y-4 rounded-t-md bg-secondary p-4">
                <div className="rounded-lg border border-dashed bg-secondary text-sm text-secondary-foreground">
                  <div className="flex flex-col h-[4em] items-center justify-center text-center text-xs p-2">
                    {selectedItem ? (
                      <>
                        <div className="font-semibold">{selectedItem.name}</div>
                        <div className="flex items-center gap-2">
                          {selectedItem.isDiscount && (
                            <span className="line-through text-muted-foreground/60">
                              {formatPrice(selectedItem.price)}
                            </span>
                          )}
                          <span
                            className={`${
                              selectedItem.isDiscount
                                ? "text-red-500"
                                : "text-primary"
                            }`}
                          >
                            {formatPrice(
                              calculateDiscountedPrice(selectedItem)
                            )}
                          </span>
                        </div>
                        {quantity > 1 && (
                          <div className="text-xs text-muted-foreground mt-1">
                            Total:{" "}
                            {formatPrice(
                              calculateDiscountedPrice(selectedItem) * quantity
                            )}
                          </div>
                        )}
                      </>
                    ) : (
                      "Belum ada item yang dipilih"
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={!selectedItem || !gameUid || !phone}
                  className="inline-flex items-center justify-center whitespace-nowrap transition-all rounded-lg shadow-sm text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-8 rounded-lg px-4 w-full gap-2"
                >
                  Pesan Sekarang
                </button>
              </div>
            </form>
            <ConfirmationModal
              isOpen={isConfirmationModalOpen}
              onClose={() => setIsConfirmationModalOpen(false)}
              data={{
                selectedItem,
                quantity,
                phone,
                server,
                gameUid,
              }}
              onConfirm={handleConfirm}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GameDetailPage;
