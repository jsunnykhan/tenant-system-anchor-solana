export type House = {
  version: "0.1.0";
  name: "house";
  instructions: [
    {
      name: "initializeHouse";
      accounts: [
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "mint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "userAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "userProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "houseAccount";
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
          name: "houseNumber";
          type: "string";
        },
        {
          name: "district";
          type: "string";
        },
        {
          name: "country";
          type: "string";
        }
      ];
    },
    {
      name: "initializeAppartment";
      accounts: [
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "mint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "appartmentAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "houseAccount";
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
          name: "number";
          type: "string";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "houseStruct";
      type: {
        kind: "struct";
        fields: [
          {
            name: "name";
            type: "string";
          },
          {
            name: "mint";
            type: "publicKey";
          },
          {
            name: "appartment";
            type: {
              vec: "publicKey";
            };
          },
          {
            name: "authority";
            type: {
              option: "publicKey";
            };
          },
          {
            name: "address";
            type: "string";
          },
          {
            name: "houseNumber";
            type: "string";
          },
          {
            name: "district";
            type: "string";
          },
          {
            name: "country";
            type: "string";
          }
        ];
      };
    },
    {
      name: "appartment";
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            type: "publicKey";
          },
          {
            name: "mint";
            type: "publicKey";
          },
          {
            name: "number";
            type: "string";
          }
        ];
      };
    }
  ];
};

export const IDL: House = {
  version: "0.1.0",
  name: "house",
  instructions: [
    {
      name: "initializeHouse",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "houseAccount",
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
          name: "houseNumber",
          type: "string",
        },
        {
          name: "district",
          type: "string",
        },
        {
          name: "country",
          type: "string",
        },
      ],
    },
    {
      name: "initializeAppartment",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "appartmentAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "houseAccount",
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
          name: "number",
          type: "string",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "houseStruct",
      type: {
        kind: "struct",
        fields: [
          {
            name: "name",
            type: "string",
          },
          {
            name: "mint",
            type: "publicKey",
          },
          {
            name: "appartment",
            type: {
              vec: "publicKey",
            },
          },
          {
            name: "authority",
            type: {
              option: "publicKey",
            },
          },
          {
            name: "address",
            type: "string",
          },
          {
            name: "houseNumber",
            type: "string",
          },
          {
            name: "district",
            type: "string",
          },
          {
            name: "country",
            type: "string",
          },
        ],
      },
    },
    {
      name: "appartment",
      type: {
        kind: "struct",
        fields: [
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "mint",
            type: "publicKey",
          },
          {
            name: "number",
            type: "string",
          },
        ],
      },
    },
  ],
};
