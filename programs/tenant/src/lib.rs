use anchor_lang::prelude::*;

declare_id!("4vRKtWhqdMo7oM6ThpR6b4pX1BSemuCbmaUzGsgbHpvy");

#[program]
pub mod tenant {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
