# ── Stage 1 : Build ──────────────────────────────
FROM rust:1.95-alpine AS builder

RUN apk add --no-cache musl-dev protobuf-dev

WORKDIR /app

COPY Cargo.toml Cargo.lock ./
COPY proto ./proto
COPY src ./src
COPY build.rs ./

RUN cargo build --release

# ── Stage 2 : Production ─────────────────────────
FROM alpine:3.20 AS production

WORKDIR /app

COPY --from=builder /app/target/release/rust-services .

EXPOSE 50051

CMD ["./rust-services"]