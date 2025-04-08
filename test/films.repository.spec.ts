import DynamoRepository from '../src/module/repository/dynamo/films.repository';
import DynamoDataBase from '../src/module/db/dynamo';

jest.mock('../src/module/db/dynamo');

describe('DynamoRepository', () => {
    let dynamoRepository: DynamoRepository;
    let dynamoClientMock: any;

    beforeEach(() => {
        dynamoClientMock = {
            scan: jest.fn(),
            get: jest.fn(),
            put: jest.fn(),
        };
        const dynamoDataBaseMock = {
            dynamoClient: jest.fn().mockReturnValue(dynamoClientMock),
        };
        dynamoRepository = new DynamoRepository(dynamoDataBaseMock as unknown as DynamoDataBase);
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    it('should list all items', async () => {
        const mockItems = [{ id: 1, data: 'Film 1' }, { id: 2, data: 'Film 2' }];
        dynamoClientMock.scan.mockReturnValue({
            promise: jest.fn().mockResolvedValue({ Items: mockItems }),
        });

        const result = await dynamoRepository.listAll();

        expect(dynamoClientMock.scan).toHaveBeenCalledWith({ TableName: process.env.DYNAMO_DB_TABLE });
        expect(result).toEqual(mockItems);
    });

    it('should get an item by ID', async () => {
        const mockItem = { id: 1, data: 'Film 1' };
        dynamoClientMock.get.mockReturnValue({
            promise: jest.fn().mockResolvedValue(mockItem),
        });

        const result = await dynamoRepository.listById(1);

        expect(dynamoClientMock.get).toHaveBeenCalledWith({
            TableName: process.env.DYNAMO_DB_TABLE,
            Key: { id: 1 },
        });
        expect(result).toEqual(mockItem);
    });

    it('should add an item', async () => {
        dynamoClientMock.put.mockReturnValue({
            promise: jest.fn().mockResolvedValue({}),
        });

        await dynamoRepository.add(1, { title: 'Film 1' });

        expect(dynamoClientMock.put).toHaveBeenCalledWith({
            TableName: process.env.DYNAMO_DB_TABLE,
            Item: {
                id: 1,
                data: { title: 'Film 1' },
            },
        });
    });

    it('should handle errors in listAll', async () => {
        dynamoClientMock.scan.mockReturnValue({
            promise: jest.fn().mockRejectedValue(new Error('Scan error')),
        });

        await expect(dynamoRepository.listAll()).rejects.toThrow('No se pudieron listar los elementos');
    });

    it('should handle errors in listById', async () => {
        dynamoClientMock.get.mockReturnValue({
            promise: jest.fn().mockRejectedValue(new Error('Get error')),
        });

        await expect(dynamoRepository.listById(1)).rejects.toThrow('No se pudo obtener el elemento por ID');
    });

    it('should handle errors in add', async () => {
        dynamoClientMock.put.mockReturnValue({
            promise: jest.fn().mockRejectedValue(new Error('Put error')),
        });

        await expect(dynamoRepository.add(1, { title: 'Film 1' })).rejects.toThrow('No se pudo agregar la película');
    });
});