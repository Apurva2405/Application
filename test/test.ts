import ServerData from '../src/serverdata/serverData';

import { expect, should } from 'chai';


var body = {
    name: 'abcs',
    emailid: 'abc@gmail.com',
    ext: '.jpg',
    image_base64: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAH8AhwMBEQACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAABQIDBAYBB//EAEMQAAEDAwEFBAcEBwYHAAAAAAEAAgMEBRESBiExQVETYXGBIjJCUpGh0RRigsEHFSNyorHwM0SSlLLhFiRTVFVzdP/EABoBAAEFAQAAAAAAAAAAAAAAAAABAgMEBQb/xAAxEQACAQMDAgQFBAEFAAAAAAAAAQIDBBESITEFURMiMkFCYXGRsSNSgaEUBhUk0fD/2gAMAwEAAhEDEQA/APuKABAAgAQBnq6ymo4jLVzRwxj2pHABMnOMFmTwOjCUniKyIKrakSEtttDJMOUsx7Nnlnefgse465QpvEd2XqfT5PebwL5bpeZydVbHTj3aeL83ZWTV67XltBYLcbKjH2bMzvtL98tyrnH/AOgtHwGFTn1S6lzMlVKmuIIj2L/+7rP8y/6qNdRuf3/++47RD9q+yJsdWx74bpXN8ZdY+DsqWPVbqPxDXRovmCNUN5vFORmanqm+7LHocfNu75K9S6/WW01kglY0ZcZQzpNqqUkNuMElG4+270o/8Q4eeFsW/WLets3hlSpYVI+ncfRTRzRtfE9r2O3tc05B8CtVSTWUUWmnhliUAQAIAEACABAHhOEAc9eNohDI+ktjWz1Ldz5Cf2cXieZ7gsm+6pTtliO8i9b2bqeaeyOf7GWpqBNWSPqqnk5wzp/dHALlK93Xup77/I1IqFKOIrCG1PaJ5N8pEbfiVYodKqz3m8IrTvIraO4whtVMz12ukP3j9Fp0+l28OVn6lWV1UfDwamU0DPVhjH4QrkbelH0xRC5yfLJmNmPUb8E/RHsJl9yt1NC/1oYz+EJkqFKXqihynJcMzTWmlkzpa5h+6VTqdLt58LH0Jo3VSIvqbPMwHsiJG9Oaza/SqsN4b/ks07yL9Wwrg+1WyYyW6UwOz6cLhmN/i3l4hR2vUa9pLD47MnqU6dZeb7nUWW/Q3EmCVvYVjRl0LjxHVp5hddZ39K6j5eexkXFrOjvyu44yrxWBAAgAQB4TuQByd/vclTM+gt0jmMYdNRUN459xvf1PJYHVOqeF+lS5NO0tFhVKi+iMlstpkAZC0Rwt4kj+slc7b2tW6nqb27lytXjT+p0VLSw0rcRN9Lm47yV0Vvb0qCxFGZUqTqPcvyrOoZg91JMoMBqRqQYDUjUhMHmpGpC4DUjUJgNSNQYM9VSw1TcSt9Lk4cQq9xb0q6xNfyS06k6bzE5y5218LmucXDS7MczDgsPUdCsCpRrWU9UeO5p0a0KscMc7PXx1S/7FX4bWMblrxubM3qOh6hdV07qMbmOl7SMy7tfC88fT+DoAcrUKR6gAQBzm1N1fAG2+jfpqZxl7wd8UfXxPAf7LJ6pfK2p6Y+pl6ytvFeuXCFNpoGv0xtGmFg3/ANdVytvQlc1My49zSr1dC25OjjDY2BjAA0DAAXQQUYRUYmY8t5ZLWnahMBrRqDAa0agweakmoMBqRqDAakagwGpGoMBqRqDAa0agwRkDZGFjwHNO4gps9M1plwKsp5RzV3oHQSNdG4sLTrhlHFjh/XwWHVhOzqqcHsadGpGrHTI6bZ66/rOj/aANqYjonYOTuo7jxXY2V1G5pKS5Me5oOjPHt7DZXCuUVtRHSUstTM7THEwvce4b02clCLk/YWMXJqK9zgad01ZUSVc2e3qX6iPdHst8hhcDeXErmu33OjjCNKGlcI6amY2CFsbeXE9StajBUoKKM2bcpZZbqUuoZgNSTUGDHcLvb7YzXcK2npm8jLIG5+KVNyeI7iqLM1BtNZLjKIqG7Uc8p4MZM3UfLinOM1yn9gwNNSZqEwGpGoXAakahMCq67T2S0SdlcbnTQy4z2ZeC/wDwjenqE2spZFSIWzauxXWXsqC6U8svKPXhx8ikkpw3ksC6GONSbqG4DUjULpKqiNs8Lo3c+B6FRVYqpBwY6DcJZRz9JVOtF1jqidMRPY1A5aSdzvI/IlVelXTt6+iXHBeuaSr0fnyjv28F2pz5zW2lSfs1NQg76iTU8fcbvPz0rH6zX8Ohp92aHTaeqo59hba25qAT7IyuUtVmrnsaNw/Jgcalraijg8LwOJTXUS5YuBLtdf22Gw1NcwB8wAbE08C8nAUlD9aooRYun3Ph0gq7rWGor5JqusmJIa1pe93g0cB4LWWy0U1sJt7kqy0vphmro6qlxjS6eF7BnxcEKVRLPInlPpf6Ldo6utjqbPc5XTTUrRJDM85c+Phgnng4396qXcY4VSPuJjfB32pUdQuDlf0jbQT2OxNFC4trKyUQxP8Ac3EucO8Abu8q1aRU5tvhCNHyO3WipuD3upqWrrpc5kdFG6Tf953DPiVoSlNrPCDyrkLjZ56GVjKukqaOY74+2YWZP3TzPgUilNLPKBaXwfUP0abSz3W2TUdxeZKuicGmQ8XsPqk9+4jyWZeKNGSceGSKOTsxO08yFVjXiwcCercn6xuBJd4mvme1wy2Rm8LNuHpq6kX7Z+U6TZasdV2SAyuLposxSE83N3Z89x8121jW8ahGRiXdPw6zSEG0spl2hLOUFM0ebiSfkAuf69UzVjA0+mxxSb7sjbnaZsHmNyxraSjU3J66yhhJJpCtzqY2RWjHJlfOeqr88ksaYh2stLtobY2jbUNgcJmya3N1DA47lbs7iNCpqkvYJ0m44Ru2ctNDYafsrfGRI4Dtah/9pKe89O4bgnV76pVe2y7EXgY3fI8J7aJ0cuJI3jDmPGprh0IKbTrTjumMlBe5z1m2OpbPtLLdLfL2dNJAYxSY3RuLgTpPu7uHLJ5YAvVrvxaWlrcjSaZ05G5U8CiDajZmm2jfQCsmkZDSyue9jNxlBGNOeXLeN/FWLe58DVtnISTY1hiipKdlPSxsggjbpZFGNLWjuAVWrcVJy1SY+MEjLco4K6lfS10TJ6d/rRyDI8e4943plO5q05Zix/hJnN7ObOQbPV9dPT1MksdSGNYyQb4w3O4n2uPHdwU13eK4jFKOMEtOi45ydC2bfxVEklA0xS55qSE2iGUDHcXh0wx7IwoLiSlMnoLERhsXJpnuNMTgBzJQP3hg/wCldL0Kpqoyh2KHU4+aMhbdzq2guJPJ0bf4B9Vl9bf/ACi3Yr9BEI+CxXzksM0ukPZjJzuVqLyiFR3Mc0uEuSxGBQ6qZGMyPa0dXHCVJvgfoJ0txppZWxxzte53DTv+af4ckstEMojumOWZToFSfJpBUyImS1J2RuCDio2PRVJ6pwo5DlyJq2ugp36JpWscRnDkxQk1lFyCMv2uOUZika8dWnKSUXHlFiMUWRS5PFNyEoG6F6OCrOJmk3kqt7k0RjsluvlS3k6lafg4/VdL/p/40Z3U15I/UyXlunaC4D3jG7+AD8lT62n/AJJPYPNBfyVRlYjLMkXHe3Ckpyxsxi2MNS12/l344KfKLFNiwULZGuEpL3uGNbt5Hh0UnitP5ErSwNLO91THpd6MsZ0yjof9+KJxw8+xVqySQ8YWsaGjgEKSRSabZLtcc07xBNIdr3pPEDSBlRrDSRMgKRyFUWLbu9lNTmfPPDWc3OPABJGOt4RYpTfAl/VhbE3tYyJuLnsGCHHecFLKq9TxwW4yg/c1UkErWgO1OPvEYyopSWRZTSQwaNLd6hnPOyK7eWVOTEOQz2SGb3VuHsUzAfNx+i6foC9bM7qb8kUR2oh7O/xScqin0+Ja76OCZ16l54zF6dP9KS7P8i9pwVzkkaDLmlNI2iwYPEZUiY3gk1jOIY34J+Rrb7mK5UE0korLc8R1jRggnDZW9D9VZpTT8kuBIySXm4MUG0bGPMNxhkpp27nAtyPqlqW0l6SRU8rMWb47pRyjMdVEfxgKvKFRfCGhlwqozwkYfxBR5n2DQyuS400fr1EQ/GEqjUfCE0MXVO0lNH6NM187zuGkYGVYhbzfq2HeF7svt1HVTztr7qcSt/sYeUXf4/14PqSUFoiMcljERoSqjY1IrdvUbY9FTym+49IqA1OAHEp6WR72Q82LiJ/WNVyfMImnqGDf8yV1/RKTjbt9zI6lLM4x7Iv2xpnOt0dawZfRyCQ/ucHfI58lY6rQ8W3eOVuRWFTRV0vh7CGoYMMmZ6jxnd1XG1oYxJe5sU5cxfKIscq7HNFoKVMZgsaU9MYywFPyIVVlHR3BgZWwCTAw2Ru57fA9O47lco3TitMllDEpReYPAgqtjyXE0FfGRyZUNLD8RkfyVqNSjJbSx9SVXDXrj9jL/wAIXL36PH/uH0T9Mf3L7iq6p9n9i+n2Pm1f83XU8bRyhBkd+Q+aY50o8y+24O5b9MfuO6G1UFuGaaLVKOM0u9/lyHkqtW5ztBYIm5z9T/6NZKptjkitxUbY7BWThMY9FTjvSokieOkFPSz1TxujbhvUuPRWaNNvf+PuNk8tROx2foTbrRT07x+1DdUpHN53u+ZXd2tJUaMYI564q+LVcjfLG2WN0b2hzXAhwPAgqdpNYZCm08o4mnpjSVNRZajJ0enTPPts5fDh5Lkrm18OpKi+HujbVXXCNZfRmVzXRSFjhhwOFiTg4vS+UXU1NZRY1yjGtFgKVMayYcn5GtEg5OyIe6kuoTAakZEaDUjIuCJcmtikS5I2KQJUbY4qe5CJEiAa57g1gy4nAHVPjHLSXIraissY2+jFfd4qYDNNQESTu5Pl9lvlx8l0nTbRSqLtH8mbcVnCm37y/B2Q4LpjIPUAJtorU6vgZNSkMrac64H9erT3FUr21/yKe2zXBZtq6pS83pfIi1MulO6ZjTHVRHTNE7i1w4hcvc0XVWcYkuUalOfhSx8L4MOSCspoucljXJjQ3BMOS5G4JByXI3B7qS5DAakagwGpGQweEpMi4IFyaKkVucjA9Igckp2441tbLTmOCmaH3KoGI2com83u6YWvZ2slJJep/wBFOrUUsyfpX9nWWe3RWyiZTxEuPrSPPF7zxcV11CjGjBQiY1aq6s3Jm5TEQIA8IyEAIr5ZpJJ/1hayGVzBhzScNmb0Pf0Kzr2yVbzw2kv7LlvcKC0VN4/gQmSKu1OYww1Me6WB4w5p8FytzQy+MS90atOTh84vhmbeOPFUGt8FnkkHYSYE0ktaTAmCQekG4DUgMAXIwLggXpcAokS7KVIckABJwOJSpZeELwXRFzJ2wUkX2ivf6rB6sY95x5BaVnaynJaVl/grVaixmTxH8nU2O0MtzHySv7asm3zTnn3DoO5dba2saEce/uzFr13VfZLhDVWyAEACABAAgBVd7HT3IiXJgqmD9nURj0h3HqO4qpc2dO4Xm57lihcTpPbddjlLjT1tuJNxh1Rj+9RDLCPve6Vy150ytRecZXc2KFzSqbReH2KWPa9ocwhzTwIKymmtmWj3KbgA3pcBgN6MACMC4A7kCEJpo4Ga5nhjep5p8YSk8IDbbrXcbkQYmmjpzxmlb6bh91v5lbNl0irUeqpsilXvKUNlu/6OttlrpbZCY6WPBO98jjl7z1J5rqKNvTox0wRj1a06ssyZuUxECABAAgAQAIAEAeEDojACau2ZttU90jInU0p3mSndoJ8RwPwVKv0+3r+qJap3lansnlfMVT7K18ZzTV8Mrek8Rafi0/ksmr0CD9Ei5Dqa+KJlfY72z+6QSd8dR9QFUl0KuuGiddQoPuV/qm9f+LP+Yj+qZ/sdz8h3+dQ7/wBFrLDen8YKWIdXzk/yCkh0Gs/U0NfUKK4ya4dlKl+Ptlx0j3aaLH8Ts/yV2j0KmvXLJXn1J/BEc26wW63vEsMAfN/1pTrf8Tw8lrULOjQ9ESjVuatT1MZ4VogPUACABAAgD//Z',
    phone: 3123,
    salary: '3213'
};

describe('ServerData', function () {

    describe('#getAllUsers', () => {
        it('should be return promise', () => {
            var a: Promise<any> = ServerData.getAllUsers("abc");
            expect(a).to.be.a('promise');
        });
       
        // it('expected formate should return in expected f', () => {
        //     console.log(body);
        //     expect(body).to.equal({
        //         name: "abcs",
        //         emailid: "abc@gmail.com",
        //         ext: ".jpg",
        //         image_base64: "data:image/jpeg;base64,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",
        //         phone: 3123,
        //         salary: "3213"
        //     });
        // });
        // it("it should return a valid response for search string", (done) => {
        //     return ServerData.getAllUsers("abc")
        //         .then((response) => {
        //             console.log(response);
        //             expect(response).to.equal("RESPONSE");
        //             done();
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //             chai.assert.fail(err, null, err.message);
        //             done();
        //         });
        // });
    });
    describe('#saveUser', () => {

        it('should be return promise', () => {
            var a: Promise<any> = ServerData.saveUser(body);
            expect(a).to.be.a('promise');
        });

        it('for saving data body object should be an object but not empty', () => {
            expect(body).to.be.a('object').but.not.empty;
        });
        it('uploading image base64 should be not empty', () => {
            expect(body).to.be.a('object').have.any.keys('image_base64');
        });

        it('uploading image base64 should be string includes data:image which starting of base64 image', () => {
           // console.log(body.image_base64);
            expect(body.image_base64).to.be.a('string').includes('data:image/jpeg;base64');
        });

    });
    describe('#updateUser', () => {

        it('should be return promise', () => {
            var a: Promise<any> = ServerData.updateUser("59fc44e7ffaf674a20c0427e",body);
            expect(a).to.be.a('promise');
        });

        it('for updating data body object should be an object but not empty', () => {
            expect(body).to.be.a('object').but.not.empty;
        });

        it('uploading image base64 should be string includes data:image which starting of base64 image', () => {
           // console.log(body.image_base64);
            expect(body.image_base64).to.be.a('string').includes('data:image/jpeg;base64');
        });
    });
});
