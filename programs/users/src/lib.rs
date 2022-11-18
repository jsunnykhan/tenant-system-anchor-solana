use anchor_lang::prelude::*;

declare_id!("HNeNExbGue5LFLtXgvM1mpfPqEwZ6LWxhogTwMiUTaV2");

#[program]
pub mod users {
    use super::*;

    pub fn initialize_user(
        ctx: Context<Initialize>,
        name: String,
        address: String,
        nid: String,
    ) -> Result<()> {
        let user:&mut Box<Account<UserStruct>> = &mut ctx.accounts.user_account;
        // initialize a account 
        user.name = name;
        user.address = address;
        user.nid = nid;
        // authority set
        user.authority = ctx.accounts.authority.key();
        Ok(())
    }
    
    pub fn add_mint_key (ctx : Context<SetMintKey> , mint_key : Pubkey ) -> Result<()> { 
        let user_profile = &mut ctx.accounts.user_profile;
        user_profile.mint.push(mint_key);
        Ok(())
    }

    pub fn remove_user (_ctx: Context<RemoveUser>) -> Result<()> {
        // Donot remove this functions because it's a working function
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub authority : Signer<'info>,
    #[account(
        init ,  
        seeds = [ b"user".as_ref() , authority.key().as_ref()],
        bump,
        payer = authority,
        space = 8 + std::mem::size_of::<UserStruct>() + 32 * 50
    )]
    pub user_account : Box<Account<'info , UserStruct>>,
    pub system_program : Program<'info , System>

}

#[derive(Accounts)]
pub struct SetMintKey <'info>{
    #[account(mut)]
    pub authority : Signer<'info>,
    #[account(mut , has_one = authority , seeds = [ b"user".as_ref() , authority.key().as_ref()] , bump)]
    pub user_profile: Account<'info , UserStruct>
    
}

#[derive(Accounts)]
pub struct RemoveUser <'info>{
    #[account(mut)]
    pub authority : Signer<'info>,
    #[account(
        mut ,
        close = authority, 
        seeds = [ b"user".as_ref() , authority.key().as_ref()],
        bump,
        has_one = authority
    )]
    pub user_account : Box<Account<'info , UserStruct>>,
    pub system_program : Program<'info , System>
}

#[account]

pub struct UserStruct{
    pub name: String,
    pub address: String,
    pub nid :String,
    pub authority : Pubkey,
    pub mint : Vec<Pubkey>
}