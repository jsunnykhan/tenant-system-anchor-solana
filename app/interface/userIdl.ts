export type Users = {
  version: "0.1.0";
  name: "users";
  instructions: [
    {
      name: "initializeUser";
      accounts: [
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "userAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "name";
          type: "string";
        },
        {
          name: "address";
          type: "string";
        },
        {
          name: "nid";
          type: "string";
        }
      ];
    },
    {
      name: "addMintKey";
      accounts: [
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "userProfile";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "mintKey";
          type: "publicKey";
        }
      ];
    },
    {
      name: "removeUser";
      accounts: [
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "userAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: "userStruct";
      type: {
        kind: "struct";
        fields: [
          {
            name: "name";
            type: "string";
          },
          {
            name: "address";
            type: "string";
          },
          {
            name: "nid";
            type: "string";
          },
          {
            name: "authority";
            type: "publicKey";
          },
          {
            name: "mint";
            type: {
              vec: "publicKey";
            };
          }
        ];
      };
    }
  ];
};

export const IDL: Users = {
  version: "0.1.0",
  name: "users",
  instructions: [
    {
      name: "initializeUser",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "userAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "name",
          type: "string",
        },
        {
          name: "address",
          type: "string",
        },
        {
          name: "nid",
          type: "string",
        },
      ],
    },
    {
      name: "addMintKey",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "userProfile",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "mintKey",
          type: "publicKey",
        },
      ],
    },
    {
      name: "removeUser",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "userAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "userStruct",
      type: {
        kind: "struct",
        fields: [
          {
            name: "name",
            type: "string",
          },
          {
            name: "address",
            type: "string",
          },
          {
            name: "nid",
            type: "string",
          },
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "mint",
            type: {
              vec: "publicKey",
            },
          },
        ],
      },
    },
  ],
};
