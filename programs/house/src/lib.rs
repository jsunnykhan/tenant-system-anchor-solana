use anchor_lang::prelude::*;

use users::cpi::accounts::SetMintKey;
use users::program::Users;
use users::{self, UserStruct};

declare_id!("HpZSVVpBDee5A23FBDa6nZ3QyetewvEm7w48JEk8mbVg");

#[program]
pub mod house {
    use super::*;

    pub fn initialize_house(
        ctx: Context<InitializeHouse>,
        name: String,
        address: String,
        house_number: String,
        district: String,
        country: String,
    ) -> Result<()> {
        let house = &mut ctx.accounts.house_account;
        let mint = &mut ctx.accounts.mint;
        let authority = &mut ctx.accounts.authority;

        house.name = name;
        house.address = address;
        house.house_number = house_number;
        house.district = district;
        house.country = country;
        house.authority = Some(authority.key());
        house.mint = mint.key();

        users::cpi::add_mint_key(ctx.accounts.set_mint_ctx(), ctx.accounts.mint.key())?;

        Ok(())
    }

    pub fn initialize_appartment(ctx: Context<InitializeAppartment>, number: String) -> Result<()> {
        let appartment = &mut ctx.accounts.appartment_account;
        let house = &mut ctx.accounts.house_account;

        appartment.authority = ctx.accounts.authority.key();
        appartment.number = number;
        house.appartment.push(appartment.key());

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeHouse<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(mut)]
    /// CHECK: This is not dangerous we don't read or write from this account
    pub mint: AccountInfo<'info>,
    #[account(mut , has_one = authority)]
    pub user_account: Account<'info, UserStruct>,
    pub user_program: Program<'info, Users>,
    #[account(
        init ,
        seeds = [b"house".as_ref(), mint.key().as_ref()],
        bump,
        payer = authority,
        space = 8 + std::mem::size_of::<HouseStruct>() + 32 * 50
     )]
    pub house_account: Box<Account<'info, HouseStruct>>,

    pub system_program: Program<'info, System>,
}

impl<'info> InitializeHouse<'info> {
    pub fn set_mint_ctx(&self) -> CpiContext<'_, '_, '_, 'info, SetMintKey<'info>> {
        let cpi_program = self.user_program.to_account_info();
        let cpi_account = SetMintKey {
            authority: self.authority.to_account_info(),
            user_profile: self.user_account.to_account_info(),
        };

        CpiContext::new(cpi_program, cpi_account)
    }
}

#[derive(Accounts)]
pub struct InitializeAppartment<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(mut)]
    /// CHECK: This is not dangerous we don't read or write from this account
    pub mint: AccountInfo<'info>,
    #[account(
        init ,
        seeds = [b"appartment".as_ref() , crate::id().key().as_ref() , mint.key().as_ref()],
        bump,
        payer = authority,
        space = 8 + std::mem::size_of::<Appartment>() 

    )]
    pub appartment_account: Box<Account<'info, Appartment>>,
    #[account(mut)]
    pub house_account: Account<'info, HouseStruct>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct HouseStruct {
    pub name: String,
    pub mint: Pubkey,
    pub appartment: Vec<Pubkey>,
    pub authority: Option<Pubkey>,
    pub address: String,
    pub house_number: String,
    pub district: String,
    pub country: String,
}

#[account]
pub struct Appartment {
    pub authority: Pubkey,
    pub mint: Pubkey,
    pub number: String,
}
