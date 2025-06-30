-- CreateTable
CREATE TABLE "Card" (
    "card_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "gif_url" TEXT NOT NULL,
    "upvotes" INTEGER NOT NULL,
    "owner" TEXT,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("card_id")
);
