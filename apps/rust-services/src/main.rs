use tonic::{transport::Server, Request, Response, Status};

pub mod patrimoine {
    tonic::include_proto!("patrimoine");
}

use patrimoine::patrimoine_service_server::{PatrimoineService, PatrimoineServiceServer};
use patrimoine::{CalculateRequest, CalculateResponse};

#[derive(Debug, Default)]
pub struct PatrimoineServiceImpl;

#[tonic::async_trait]
impl PatrimoineService for PatrimoineServiceImpl {
    async fn calculate(
        &self,
        request: Request<CalculateRequest>,
    ) -> Result<Response<CalculateResponse>, Status> {
        let req = request.into_inner();

        let total_accounts: f64 = req.account_balances.iter().sum();
        let total_assets: f64 = req.asset_values.iter().sum();
        let total = total_accounts + total_assets;

        Ok(Response::new(CalculateResponse {
            total,
            total_accounts,
            total_assets,
        }))
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let addr = "0.0.0.0:50051".parse()?;
    let service = PatrimoineServiceImpl::default();

    println!("Rust gRPC server démarré sur {}", addr);

    Server::builder()
        .add_service(PatrimoineServiceServer::new(service))
        .serve(addr)
        .await?;

    Ok(())
}

// test