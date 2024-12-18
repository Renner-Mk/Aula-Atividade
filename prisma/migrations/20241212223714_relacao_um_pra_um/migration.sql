-- CreateTable
CREATE TABLE "profile" (
    "id" UUID NOT NULL,
    "bio" VARCHAR(150),
    "image" VARCHAR(255),
    "birthDate" TIMESTAMP(3),
    "studentId" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_studentId_key" ON "profile"("studentId");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
